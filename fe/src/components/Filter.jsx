import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Filter() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const fetchCategories = async () =>{
    try {
      const response = await axios.get('http://localhost:5500/categories/')
      console.log(response)
      setCategories(response.data.data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <option value={category.id}>{category.name}</option>
      )
    })
  }

  const fetchFilteredProducts = async (filter) => {
    try {
      const { category, sortOrder } = filter;
      const response = await axios.get("http://localhost:5500/products/search/", {
        params: {
          id_category: category,
          sortBy: sortOrder,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFilteredProducts({ category, sortOrder });
  };

  useEffect(() => {
    fetchCategories()
  }, [])
  

  return (
    <div className='w-3/4 m-auto mt-5 flex flex-row justify-around items-center p-2 border border-gray-300 rounded-md shadow-md'>
      <div>
        <p className='font-semibold'>Cari Berdasarkan</p>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p className='font-medium'>Kategori</p>
        <select className='border border-gray-300 p-2 rounded-md' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Default</option>
          {renderCategories()}
        </select>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p className='font-medium'>Urutkan</p>
        <select className='border border-gray-300 p-2 rounded-md' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Default</option>
          <option value="price_high_to_low">Harga tertinggi</option>
          <option value="price_low_to_high">Harga terendah</option>
        </select>
      </div>
      <div>
        <button className='bg-emerald-500 text-white font-semibold p-2 px-4 rounded-md hover:bg-emerald-600 transition duration-100' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Filter;