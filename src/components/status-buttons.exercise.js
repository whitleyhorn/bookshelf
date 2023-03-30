/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })

  const listItem = listItems?.find(li => li.bookId === book.id) ?? null

  const [create] = useMutation(
    bookId =>
      client(`list-items`, {
        method: 'POST',
        token: user.token,
        data: {bookId: bookId},
      }),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  const [update] = useMutation(
    data =>
      client(`list-items/${data.id}`, {method: 'PUT', token: user.token, data}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  const [remove] = useMutation(
    data =>
      client(`list-items/${data.id}`, {
        method: 'DELETE',
        token: user.token,
        data,
      }),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => update({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => update({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => create(book.id)}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
