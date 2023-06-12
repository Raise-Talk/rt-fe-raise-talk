// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { addContact } from 'src/store/apps/contacts'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { AxiosError } from 'axios'
import { useContactContext } from '../Context'

interface AddContactDrawerType {
  open: boolean
  toggle: () => void
}

interface ContactData {
  name: string
  phone: string
  email?: string
  note?: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatário'),
  email: yup.string().email('Email inválido').required('Email é obrigatário'),
  phone: yup.string().required('Telefone é obrigatário')
})

const defaultValues = {
  name: '',
  phone: '',
  note: '',
  email: ''
}

const AddContactDrawer = (props: AddContactDrawerType) => {
  //** Contexts
  const { contacts, setContacts } = useContactContext()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [status, setStatus] = useState<string>('LEAD')

  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: ContactData) => {
    try {
      const newContact = await addContact({ ...data, status })

      setContacts([...contacts, newContact])
      toggle()
      reset()

      toast.success('Contato adicionado com sucesso!', {
        position: 'bottom-left',
        duration: 5000,
        style: {
          padding: '16px',
          color: theme.palette.success.main,
          border: `1px solid ${theme.palette.success.main}`
        },
        iconTheme: {
          primary: theme.palette.success.main,
          secondary: theme.palette.primary.contrastText
        }
      })
    } catch (error: AxiosError | any) {
      console.log(error)

      toggle()
      toast.error('Erro ao adicionar o contato, tente novamente!', {
        position: 'bottom-left',
        duration: 5000,
        style: {
          padding: '16px',
          color: theme.palette.error.main,
          border: `1px solid ${theme.palette.error.main}`
        },
        iconTheme: {
          primary: theme.palette.error.main,
          secondary: theme.palette.primary.contrastText
        }
      })
    }
  }

  const handleClose = () => {
    setStatus('LEAD')
    setValue('phone', '')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Adicionar contato</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='John Doe'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='phone'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Telefone'
                  onChange={onChange}
                  placeholder='(99) 99999-9999'
                  error={Boolean(errors.phone)}
                />
              )}
            />
            {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='status-select'>Status</InputLabel>
            <Select
              fullWidth
              value={status}
              id='select-status'
              label='Status'
              labelId='status-select'
              onChange={e => setStatus(e.target.value)}
              inputProps={{ placeholder: 'Status' }}
            >
              <MenuItem value='LEAD'>LEAD</MenuItem>
              <MenuItem value='ATENDIMENTO'>ATENDIMENTO</MenuItem>
              <MenuItem value='VISITA'>VISITA</MenuItem>
              <MenuItem value='PROPOSTA'>PROPOSTA</MenuItem>
              <MenuItem value='FECHAMENTO'>FECHAMENTO</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='note'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  rows={4}
                  value={value}
                  multiline
                  onChange={onChange}
                  label='Descrição'
                  id='textarea-filled-static'
                  defaultValue='Uma breve descrição ou anotação sobre o contato'
                  error={Boolean(errors.note)}
                />
              )}
            />
            {errors.note && <FormHelperText sx={{ color: 'error.main' }}>{errors.note.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Cadasrar
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddContactDrawer
