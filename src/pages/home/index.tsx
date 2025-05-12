import { useState,type FormEvent,useEffect } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs' //icones
import { Link,useNavigate } from 'react-router-dom'//moedas

interface CoinProps{
    id:string;
    name:string;
    symbol:string;
    priceUsd:string;
    vwap24Hr:string;
    changePercent24Hr:string;
    rank:string;
    supply:string;
    maxSupply:string;
    marketCapUsd:string;
    volumeUsd24Hr:string;
    explorer:string;
}

interface DataProp{
data:CoinProps[]
}

export function Home(){
const [input,setInput] = useState("");
const [coins,setCoins] = useState<CoinProps[]>([]);
const navigate = useNavigate()

 useEffect(()=>{
getData()
 },[])

 async function getData(){
 /*const await response =*/  fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0", {
    headers: {
        // Substitua pela chave, se for o caso
        'Authorization': 'Bearer da0d8e35d578ad3d2a6b9a5dfe57c4b01e06d7aafb0980a66ce1a176d158a688'
    }
})/*ou const data:DataProp = await response.json() 
console.log(data.data)
*/
.then(response => response.json())
.then((data:DataProp) => {
   // console.log(data.data);para n ficar usando data.data cria const
   const coinsData = data.data;
   console.log(coinsData)

   //FORMATAR VARIOS NUMEROS PARA P DOLAR "$104,482.90" EXEMPLO
   const price = Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
   })

const formatedResult = coinsData.map((item)=>{
    const formated = {
        ...item,
        formatedPrice: price.format(Number(item.priceUsd))
    }
    return formated
})
console.log(formatedResult)
})

 }

function handleSubmit(e: FormEvent){
    e.preventDefault();
    if(input ==="")return;

    navigate(`/detail/${input}`)
}

function handleGetMore(){
    alert("h")
}

    return(
     
<main className={styles.container} >
    <form onSubmit={handleSubmit}
className={styles.form} >
<input value={input}
onChange={(e) => setInput(e.target.value)}
 type="text"
placeholder='Digite sua moeda' 
/>
<button type='submit'>
<BsSearch size={30} color='#FFF'/>
</button>
    </form>

<table className=''>
<thead>
    <tr>
        <th scope='col'> Moedas</th>
        <th scope='col'> Valor mercado</th>
        <th scope='col'> Preço</th>
        <th scope='col'> Volume</th>
        <th scope='col'> Mudança 24h</th>
    </tr>
</thead>

<tbody id='tbody'>
<tr className={styles.tr}> 
    <td className={styles.tdLabel} data-label="Moeda">
      <div className={styles.name}>
          <Link to="/detail/bitcoin">
        <span>Bitcoin</span> | BTC
        </Link>
      </div>
    </td>

    <td className={styles.tdLabel} data-label="Valor mercado">
    1T
    </td>

    <td className={styles.tdLabel} data-label="Preço">
    8.00
    </td>

     <td className={styles.tdLabel} data-label="Volume">
   2B
    </td>

     <td className={styles.tdpositive} data-label="Mudança 24h">
    <span>1.20</span>
    </td>

</tr>
</tbody>
</table>

<button className={styles.buttonMore}
onClick={handleGetMore}
>Carregar mais</button>
</main>

    )
}