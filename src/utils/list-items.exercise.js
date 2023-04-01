import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'

function useListItem(user, bookId) {
  const {listItems} = useListItems(user)
  const listItem = listItems?.find(li => li.bookId === bookId) ?? null
  return listItem
}

function useListItems(user) {
  const queryResult = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })

  return {...queryResult, listItems: queryResult.data}
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(user) {
  const mutationResult = useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    defaultMutationOptions,
  )

  return mutationResult
}
function useRemoveListItem(user) {
  const mutationResult = useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    defaultMutationOptions,
  )

  return mutationResult
}
function useCreateListItem(user) {
  const mutationResult = useMutation(
    ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    defaultMutationOptions,
  )

  return mutationResult
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
