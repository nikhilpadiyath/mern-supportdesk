import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getTickets, reset} from '../features/tickets/TicketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

    const dispatch = useDispatch()

    useEffect(()=> {
        return() => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(()=> {
        dispatch(getTickets())
    },[dispatch])

 if(isLoading){
    return <Spinner />
 }

  return (
    <>
    <BackButton />
    <h1>Tickets</h1>
    <div className='tickets'>
      <div className='ticket-headings'>
        <div>Date</div>
        <div>Product</div>
        <div>Status</div>
        <div></div>
      </div>
      {tickets.map((ticket) => (
        <TicketItem key={ticket._id} ticket={ticket} />
      ))}
    </div>
  </>
  )
}

export default Tickets