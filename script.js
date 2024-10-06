
st="AAPL";
FetchAndCreatChart('5y',st);

getStocks(st);
getStats(st);


async function getStatusinList(symbol) {

  const url="https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata";
    let bookvalue;
    let profit;

    try{
        const response=await fetch(url);
        const result= await response.json();
        bookvalue=result.stocksStatsData[0][symbol].bookValue;
        profit=result.stocksStatsData[0][symbol].profit;
    }catch(err){
        console.log(err);
    }
    return{
        bookvalue,
        profit
    };
}

async function RenderList(){
    const list=['AAPL','MSFT','GOOGL','AMZN','PYPL','TSLA','JPM','NVDA','NFLX','DIS'];
    const listEl=document.getElementById('stock-list');

    for( let stock of list){
        const {bookvalue,profit}=await getStatusinList(stock);
        const List_item=document.createElement('div');

        const name=document.createElement('button');
        name.classList='btn'
        const bookV=document.createElement('span');
        bookV.className='spnone';
        const proft=document.createElement('span');
        proft.className='spntwo';
        name.textContent=stock;
        bookV.textContent=`$${bookvalue}`;
        proft.textContent=`${profit}%`;
          
        if(profit>0){
            proft.setAttribute('style','color:green');
           
        }else{
           proft.setAttribute('style','color:red');
       }
       
       List_item.append(name,bookV,proft);
       listEl.append(List_item);
      
        name.addEventListener("click",()=>{
            // Function call to update graph and discription//
         
            FetchAndCreatChart('5y', stock);
            getStocks(stock);
            getStats(stock);          
      })
    }

}

RenderList();

async function FetchAndCreatChart(rang="5y",symbol="AAPL") {
    const url="https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata";
     st=symbol;

    try{
      
        const response= await fetch(url);
        const result=await response.json();
        let chartdata=result.stocksData[0][symbol][rang].value;
        let label=result.stocksData[0][symbol][rang].timeStamp;
        label = label.map((timeStamp)=> new Date(timeStamp*1000).toLocaleDateString());
       
    }catch(err){
    console.log(err);
    }
   
    //  drawChart(chartdata,label,symbol);
   // getStocks(symbol);//for discription
   // getStats(symbol);// Stockname profit bookvalue

}



async function getStocks(symbol) {
     const url="https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata";
      
     try{
        const response= await fetch(url);
        const result=await response.json();
        const stocksummary=document.getElementById('summary');
        stocksummary.querySelector('p').textContent=result.stocksProfileData[0][symbol].summary;
     }catch(error){
       console.error(error);
     }
     
}

async function getStats(symbol) {
    const url = "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata";

    try {
        const response = await fetch(url);
        const result = await response.json();
        const bookValue = result.stocksStatsData[0][symbol].bookValue;
        const profit = result.stocksStatsData[0][symbol].profit;

        const stockSummary = document.getElementById('summary');
        stockSummary.querySelector('#name').textContent = symbol;

        const profitElement = document.getElementById('profit');
        profitElement.textContent = `${profit}%`;
        profitElement.style.color = profit > 0 ? 'green' : 'red';

        document.getElementById('bookValue').textContent = `$${bookValue}`;
    } catch (err) {
        console.log(err);
    }




}


    
