import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector(state => state.notification)

    const error = {
         color: 'red',
         background: 'lightgrey',
         fontSize: '20px',
         borderStyle: 'solid',
         borderRadius: '5px',
         padding: '10px',
         marginBottom: '10px'
    }
  
    const info = {
         color: 'green',
         background: 'lightgrey',
         fontSize: '20px',
         borderStyle: 'solid',
         borderRadius: '5px',
         padding: '10px',
         marginBottom: '10px'
    }
  
    return (
        <>
            {
                notification && 
                    <div id='alert' style={notification.isError ? error : info}>
                        {notification.message}
                    </div>
            }
        </>       
    )
  }

  export default Notification