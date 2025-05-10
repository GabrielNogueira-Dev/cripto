
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs' //icones
import { Link } from 'react-router-dom'//moedas


export function Home(){
    return(
     
<main className={styles.container} >
    <form className={styles.form} >
<input type="text"
placeholder='Digite sua moeda' />
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

</main>

    )
}