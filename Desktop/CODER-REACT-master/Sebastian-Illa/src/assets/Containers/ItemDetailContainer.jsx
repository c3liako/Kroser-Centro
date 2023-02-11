
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../Detail/ItemDetail'

import { doc, getDoc, getFirestore } from "firebase/firestore"
import Loading from '../Components/Loading'


const ItemDetailContainer = () => {
    const [ product, setProduct] = useState({}) 
    const [loading, setLoading] = useState (true)
    const  {productId} = useParams()

useEffect(()=>{        
    const db = getFirestore()
    const queryDoc = doc(db, 'product',  productId)
    getDoc(queryDoc)
    .then(resp => setProduct( { id: resp.id,...resp.data()} ))
    .catch(err => console.log(err))
    .finally(()=> setLoading(false))
}, []) 
    return (
        <>

            {loading ? <Loading /> : <ItemDetail product={product}/>}
            
        </>
    )
}

export default ItemDetailContainer