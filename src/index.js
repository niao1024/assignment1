/** write your main application code in this file and add files
 * as necessary to make your code structure more testable and
 * easy to understand
 *
 * Remove the code in this file when you have tested and got working:
 * - npm start
 * - docker build --no-cache -t bth-a1 . && docker run --rm -it bth-a1
 * */

import { askQuestion, noMoreQuestions } from "./askQuestion.js"

export function addProduct(products,cart,id,name,num){
  const pro=products.find(p=>p.id===id&&p.name===name);
  if(!pro){
    throw new Error("error for id or name");
    
  }else if(num>pro.quantityAvailable){
    throw new Error("no:more than quantity")
  }else{
    const item=cart.find(p=>p.productId===pro.id);
    if(item){
      item.quantity+=num;
      item.totalPrice+=pro.price*num;
    }else{
      cart.push({
        productId:pro.id,
        quantity:num,
        eachPrice:pro.price,
        totalPrice:pro.price*num
      })
    }
    pro.quantityAvailable-=num;
  }
}

export function culculate(cart){
  const total=cart.reduce((sum,item)=>sum+item.totalPrice,0)
  return total;
}

export async  function showMenu(products){
  console.log("\n-------welcome to our system------");
  console.log("\n this is our products:");
  console.log("\nid\tname\tdescription\tprice\tquantityAvailable");
  products.forEach(p => {
    console.log(`${p.id}\t${p.name}\t${p.description}\t${p.price}\t${p.quantityAvailable}`)
  });
  console.log("\nyou can choose:");
  console.log("\n 1.add products into your cart");
  console.log("\n 2.see your cart");
  console.log("\n 3.culculate the total price")
  console.log("\n 4.quit");

  const choice=await askQuestion("please enter the number of your choice");

  return choice;
}

export function showCart(cart){
  console.log("\nproductId\tquantity\teachPrice\ttotalPrice")
  cart.forEach(p=>{
    console.log(`\n${p.productId}\t${p.quantity}\t${p.eachPrice}\t${p.totalPrice}`);
  });
}







async function run () {
  
  const cart=[];
  const products=[
    {"id":0,"name":"apple","description":"red and round","price":5,"quantityAvailable":10},
    {"id":1,"name":"milk","description":"from cow","price":6,"quantityAvailable":8},
    {"id":2,"name":"cookie","description":"yummy","price":3,"quantityAvailable":9},
    {"id":3,"name":"clock","description":"alarm you the time","price":15,"quantityAvailable":3}
  ]

  while (true){

    const choice=await showMenu(products);
    switch(choice){
      case "1":{
        const id=Number(await askQuestion("\nplease input the id of product"));
        const name=await askQuestion("\nplease input the name of product");
        const num=Number(await askQuestion("\nplease input the quantity you need"));
        try {
          addProduct(products, cart, id, name, num);
          console.log("success");
        } catch (e) {
          console.log("fail：" + e.message);
        }
        break;
      }
      case "2":
        showCart(cart);
        break;
      case "3":{
        showCart(cart);
        const total=culculate(cart);
        cart.length=0;
        console.log("the total price is"+total);
        break;
      }
      case "4":
        console.log("see you next time!");
        noMoreQuestions();
        return;
    }

  }
  
}

run()
