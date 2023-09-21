import { checkToken } from "../../utilities/users-service";

const OrderHistoryPage = () => {
    const handleCheckToken = async () =>{
        try {
            const expDate = await checkToken()
            alert(expDate.toLocaleString())
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div>
            <h1>OrderHistoryPage</h1>
            <button onClick={handleCheckToken}>Check Log In Expiration</button>
        </div>
    );
}

export default OrderHistoryPage;
