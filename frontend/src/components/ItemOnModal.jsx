import React from 'react'


function ItemOnModal({productName}) {
  
    //for users not products
        
  return (
    <div className="gradient-purple-white px-6 py-3 rounded-lg " >
       
      <div className="p-2 w-[100%] h-fit rounded-md flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-200 transition-all duration-300 " >
                {productName}
              </div>

      </div>
    </div>
  )
}

export default ItemOnModal