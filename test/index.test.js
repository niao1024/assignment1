/**  add your tests to this file and add test files as you
 * see necessary to make your code structure readable and
 * testable */

import { describe } from 'vitest'
import { addProduct, culculate } from '../src/index'

describe("addProduct", () => {
  it("when everything normal", () => {
    const cart=[];
    const products=[
      {"id":0,"name":"apple","description":"red and round","price":5,"quantityAvailable":10},
      {"id":1,"name":"milk","description":"from cow","price":6,"quantityAvailable":8},
      {"id":2,"name":"cookie","description":"yummy","price":3,"quantityAvailable":9},
      {"id":3,"name":"clock","description":"alarm you the time","price":15,"quantityAvailable":3}
    ]
    addProduct(products,cart,0,"apple",2);

    const pro=products.find((item)=>item.id===0)
    expect(pro.quantityAvailable).toBe(8);
  })

it("when add product which dont exist actually",()=>{
  const cart=[];
  const products=[
    {"id":0,"name":"apple","description":"red and round","price":5,"quantityAvailable":10},
    {"id":1,"name":"milk","description":"from cow","price":6,"quantityAvailable":8},
    {"id":2,"name":"cookie","description":"yummy","price":3,"quantityAvailable":9},
    {"id":3,"name":"clock","description":"alarm you the time","price":15,"quantityAvailable":3}
  ]

  expect(()=>addProduct(products,cart,0,"banana",1)).toThrow("error for id or name");


})

it("when the quantity more than available",()=>{
  const cart=[];
  const products=[
    {"id":0,"name":"apple","description":"red and round","price":5,"quantityAvailable":10},
    {"id":1,"name":"milk","description":"from cow","price":6,"quantityAvailable":8},
    {"id":2,"name":"cookie","description":"yummy","price":3,"quantityAvailable":9},
    {"id":3,"name":"clock","description":"alarm you the time","price":15,"quantityAvailable":3}
  ]

  expect(()=>addProduct(products,cart,0,"apple",20)).toThrow("no:more than quantity");
  

})




})

describe("culculate",()=>(
  it("when everything normal",()=>{
    const cart = [
      { productId: 0, quantity: 2, eachPrice: 5, totalPrice: 10 },
      { productId: 1, quantity: 1, eachPrice: 6, totalPrice: 6 },
      { productId: 2, quantity: 3, eachPrice: 3, totalPrice: 9 }
    ];

    expect(culculate(cart)).toBe(25);
  })
))
