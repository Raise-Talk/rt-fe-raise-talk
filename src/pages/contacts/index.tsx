// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports

import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports

import Card from '@mui/material/Card'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid, ptBR } from '@mui/x-data-grid'

import MenuItem from '@mui/material/MenuItem'

import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Custom Components Imports

import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import

// ** Actions Imports
import { fetchData } from 'src/store/apps/contacts'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'

import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/TableView/TableHeader'
import AddContactDrawer from './TableView/AddContactDrawer'
import { contactColumns } from './TableView/TableColumns'
import { useContactContext } from './Context'

const Contacts = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { contacts, setContacts } = useContactContext()

  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await dispatch(fetchData())

      if (response.payload) {
        setContacts(response.payload)
      }
    }

    fetchContacts()
  }, [])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item: CardStatsHorizontalProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon as string} />} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            rows={contacts}
            columns={contactColumns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <AddContactDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}

Contacts.guestGuard = true

export default Contacts
