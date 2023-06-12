// ** Redux Imports
// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// import data from 'src/@fake-db/components/data'

// import data from 'src/@fake-db/components/data'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

// ** Fetch Users
export const fetchData = createAsyncThunk('appContacts/fetchData', async (params?: DataParams) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/contacts`, {
    params
  })

  return response.data
})

// ** Add User
export const addContact = async (data: { [key: string]: number | string }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/contacts`, data)
  console.log(response.data)

  return response.data
}

// ** Delete User
// export const deleteUser = createAsyncThunk(
//   'appUsers/deleteUser',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await axios.delete('/apps/users/delete', {
//       data: id
//     })
//     dispatch(fetchData(getState().user.params))

//     return response.data
//   }
// )

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer
