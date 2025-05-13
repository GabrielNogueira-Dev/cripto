import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import styles from './detail.module.css'

interface ResponseData{
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
   formatedprice?:string;
   formatedMarket?:string;
   formatedVolume?:string;
}
interface CoinProps{
    data:ResponseData;
}

interface ErrorData{
    error: string;
}

type DataProps = CoinProps | ErrorData

export function Detail(){
const {cripto} = useParams();
const navigate = useNavigate(); 
const [loading,setLoading]=useState(true)
const [coin,setcoin] = useState<ResponseData>()

useEffect(()=>{

async function getCoin(){
   
try{
    fetch(`https://rest.coincap.io/v3/assets/${cripto}`,{
         headers: {
        // Substitua pela chave, se for o caso
        'Authorization': 'Bearer da0d8e35d578ad3d2a6b9a5dfe57c4b01e06d7aafb0980a66ce1a176d158a688'
    }
    })
    .then(response=> response.json())
    .then((data:DataProps)=>{
        if("error" in data){
            navigate("/")
            return;
        }
        const price = Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
   })//COMPACTAR O DADO DO CLIENTE
     const priceCompact = Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD",
    notation:"compact"
   })
const resumindodata = data.data
const resultData = {...resumindodata,
    formatedprice: price.format(Number(resumindodata.priceUsd)),
    formatedMarket: priceCompact.format(Number(resumindodata.marketCapUsd)),
    formatedVolume: priceCompact.format(Number(resumindodata.volumeUsd24Hr))
}
setcoin(resultData)
setLoading(false)
    })

}catch(error){
console.log(error)
navigate("/")
}
}

getCoin()
},[cripto])

if(loading || !coin){
    return(
        <div className={styles.container}>
            <h3 className={styles.center}>
                Carregando detalhes..
            </h3>
        </div>
    )
}
    return(
        <div className={styles.container}>
            <h1 className={styles.center}> {coin?.name}</h1>
            <h1 className={styles.center}>{coin.symbol}</h1>
            
            <section className={styles.content}>
                <img className={styles.logo}
                src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} alt="logo da moeda" />
            <h1>{coin?.name} | {coin?.symbol} </h1>
            <p><strong>Preço: </strong>{coin?.formatedprice}</p>

            <a>
                <strong>Mercado:</strong>{coin?.formatedMarket}
            </a>
              <a>
                <strong>Volume:</strong>{coin?.formatedVolume}
            </a>~
              <a>
                <strong>Mudança 24h:</strong><span className={Number(coin?.changePercent24Hr) > 0 ? styles.positive : styles.negative}>{Number(coin?.changePercent24Hr).toFixed(3)}</span>
            </a>
            </section>

        </div>
        
    )
}