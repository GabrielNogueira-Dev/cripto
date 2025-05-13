import { useState,type FormEvent,useEffect } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs' //icones
import { Link,useNavigate } from 'react-router-dom'//moedas

export interface CoinProps{
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
    formatedPrice?:string;
    formatedMarket?:string;
    formatedVolume?:string;
    formatedChange?:string;
}

interface DataProp{
data:CoinProps[]
}

export function Home(){
const [input,setInput] = useState("");
const [coins,setCoins] = useState<CoinProps[]>([]);
const [morecoins,setMorecoins] = useState(0)
const [loading,setloading] =useState(false)

const navigate = useNavigate()

 useEffect(()=>{
getData()
 },[morecoins])

 async function getData(){
    setloading(true);
 /*const await response =*/  fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=0${morecoins}`, {
    headers: {
        // Substitua pela chave, se for o caso
        'Authorization': 'Bearer da0d8e35d578ad3d2a6b9a5dfe57c4b01e06d7aafb0980a66ce1a176d158a688'
    }
})/*ou const data:DataProp = await response.json() 
console.log(data.data)
*/
.then(response => response.json())
.then((data:DataProp) => {
   // console.log(data.data);para n ficar repetitivo usando data.data cria const
   const coinsData = data.data;
   console.log(coinsData)

   //FORMATAR e simplificar qualquer NUMERO PARA P DOLAR "$104,482.90" EXEMPLO
   const price = Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
   })//COMPACTAR O DADO DO CLIENTE
     const priceCompact = Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD",
    notation:"compact"
   })
                //CRIAR NOVO ITEM DENTRO DE DATA QUE SEJA SIMPLIFICADO
const formatedResult = coinsData.map((item)=>{
    const formated = {
        ...item,
        formatedPrice: price.format(Number(item.priceUsd)),
        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
        formatedChange: price.format(Number(item.changePercent24Hr))
    }
    return formated;
})
console.log(formatedResult)
const listcoinsmais = [...coins, ...formatedResult]
setCoins(listcoinsmais);
setloading(false)

})

 }

function handleSubmit(e: FormEvent){
    e.preventDefault();
    if(input ==="")return;

    navigate(`/detail/${input}`)
}

function handleGetMore(){
    if(morecoins ===0){
     setMorecoins(10)  
      return
    }
setMorecoins(morecoins + 10)
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
{coins.length >0 && coins.map((item) => (
<tr className={styles.tr}  key={item.id}> 
    <td className={styles.tdLabel} data-label="Moeda">
      <div className={styles.name}>
        <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Logo Cripto" />
          <Link  to={`/detail/${item.id}`}>
        <span>{item.name}</span> | {item.symbol}
        </Link>
      </div>
    </td>

    <td className={styles.tdLabel} data-label="Valor mercado">
    {item.formatedMarket}
    </td>

    <td className={styles.tdLabel} data-label="Preço">
    {item.formatedPrice}
    </td>

     <td className={styles.tdLabel} data-label="Volume">
   {item.formatedVolume}
    </td>

     <td className={Number(item.changePercent24Hr) > 0 ? styles.tdpositive : styles.tdnegative} data-label="Mudança 24h">
    <span>{item.formatedChange}</span> 
    </td>

</tr>
))}
</tbody>
</table>

<button className={styles.buttonMore}
onClick={handleGetMore}
>Carregar mais</button>
{loading && <p className={styles.load}>Carregando moedas..</p>}
</main>


    )
}