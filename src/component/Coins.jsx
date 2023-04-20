import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from "../index"
import { Container, HStack, VStack ,Heading, Image,Text, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';
const Coins = () => {
  const [coins,setcoins]=useState([]);
  const [loading,setloading]= useState(true);
  const [error,setError]= useState(false);
  const [page,setPage]= useState(1);
  const [currency,setCurrency]= useState("inr");

  const currencySymbol =
  currency === "inr" ? "₹"  : currency === "eur" ? "€" :"$";

  const changepage = (page)=>{
    setPage(page);
    setloading(true);
  };
  const btns = new Array(132).fill(1)

  useEffect(() => {
    
     const fetchCoins= async()=>{
     try{
      const {data} =await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
    
      setcoins(data);
   
      setloading(false);
     }catch(error){
      setError(true);
      setloading(false);

     }
     
     };
     fetchCoins();



   
  }, [currency,page])

  if(error) return <Error message={"Error while Fetching Coins"}/>
  
  return( <Container maxW={"container.xl"}> {loading ? <Loader /> :
  <>

  <RadioGroup  value={currency} onChange={setCurrency} p={"8"}>
    <HStack spacing={"4"}>

    <Radio value={"inr"}>INR</Radio>
    
    <Radio value={"usd"}>USD</Radio>

    <Radio value={"eur"}>EUR</Radio>
    



    </HStack>


  </RadioGroup>
  
  <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
   {
    coins.map((i)=>(
      <CoinCard 
      id={i.id}
      key={i.id} 
      name={i.name} 
      price={i.current_price}
      img={i.image} 
      symbol={i.symbol} 
      currencySymbol={currencySymbol}
     />
      
    ))

   }



  </HStack>

  <HStack width={"full"} overflowX={"auto"} p={"8"}>
    

  {
    btns.map((item,index)=>(<Button key={index} bgColor={"blackAlpha.900"} 
    color={"white"} 
    onClick={()=>changepage(index+1)}>{index+1}</Button>))
  }



  </HStack>
  
  
  </>}
  
  </Container>

  );

}
const ExchangeCard = ({name,img,rank,url})=>(
<a href={url} target={"blank"}>

<VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.5s"}
m={"4"} 
css={{
  "&:hover":{
    transform:"scale(1.1)",
  }
}}
>
  <Image
  src={img}
  w={"10"}
  h={"10"}
  objectFit={"contain"}
  alt={"Exchange"}
  
  />

  <Heading size={"md"} noOfLines={1}>
    {rank}
  </Heading>

  <Text noOfLines={1}>
   {name}
  </Text>
</VStack>

</a>
);


export default Coins;
