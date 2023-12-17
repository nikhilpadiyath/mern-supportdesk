import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset} from '../features/tickets/TicketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const NewTicket = () => {
    const {user} = useSelector((state) => state.auth)
    const {ticket, isError, isSuccess, isLoading, message} = useSelector((state)=> state.tickets)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('Redmi')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=> {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            dispatch(reset())
            navigate('/tickets') 
        }

        dispatch(reset())
    }, [dispatch,isError,isSuccess,navigate,message])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({product, description}))
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
    <BackButton url={'/'} />
    <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please fill up the form below</p>
    </section>
    <section className='form'>
        <div className="form-group">
            <label htmlFor='name'>Customer Name</label>
            <input className='form-control' value={name} disabled />
        </div>
        <div className="form-group">
            <label htmlFor='email'>Customer Email</label>
            <input className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor='product'>Product</label>
            <select name='product' id='product' value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value='Redmi'>Redmi</option>
                <option value='Samsung'>Samsung</option>
                <option value='Apple'>Apple</option>
                <option value='Vivo'>Vivo</option>
            </select>
            </div>
            <div className="form-group">
            <label htmlFor='description'>Description of the issue</label>
            <textarea name='description' 
                      id='description' 
                      className='form-control' 
                      placeholder='Description' 
                      value={description} 
                      rows= {5}
                      onChange={(e) => {setDescription(e.target.value)}}
            ></textarea>
            </div>
            <div className="form-group">
                <button className='btn btn-block'>Submit</button>
            </div>
        </form>

    </section>
    </>
  )
}

export default NewTicket