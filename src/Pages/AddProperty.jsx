import React, { useState } from 'react'
import { storage, db } from './../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { collection, addDoc } from '@firebase/firestore'
import { uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'


const AddProperty = () => {
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [noBath, setnoBath] = useState('');
  const [noBed, setnoBed] = useState('');
  const [area, setarea] = useState('');
  const [desc, setdesc] = useState('');
  const [furnaturing, setfurnaturing] = useState('Furnatured');
  const [ownerNo, setownerNo] = useState('');
  const [forWhat, setforWhat] = useState("Sell")
  const [enterProductImg, setenterProductImg] = useState(null);
  const [uploadChange, setuploadChange] = useState(false)
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const docRef = await collection(db, 'products');

      const imageUrls = [];

      for (const file of enterProductImg) {
        const storageRef = ref(storage, `productImages/${Date.now() + file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      const productData = {
        id:uuidv4(),
        title,
        price,
        noBath,
        noBed,
        area,
        desc,
        furnaturing,
        ownerNo,
        forWhat,
        imgUrls: imageUrls,
      };

      await addDoc(docRef, productData);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product successfully added !!',
        showConfirmButton: false,
        timer: 1500,
      });

      setloading(false);
      navigate('/');
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500,
      });
      setloading(false);
    }
  };
  useEffect(() => {

    uploadChange&&Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Photos Uploaded !!',
      showConfirmButton: false,
      timer: 1500,
    });
    setuploadChange(false)
  }, [uploadChange])
  

  return (
    <form className='addProducts'>
      <div className="item">
        <label>title</label>
        <input type="text" placeholder='title' onChange={(e) => settitle(e.target.value)} />
      </div>
      <div className="item">
        <label>price</label>
        <input type="number" placeholder='price' onChange={(e) => setprice(e.target.value)} />
      </div>
      <div className="item">
        <label>no of bathrooms</label>
        <input type="number" placeholder='no of bathrooms' onChange={(e) => setnoBath(e.target.value)} />
      </div>
      <div className="item">
        <label>no of bedrooms</label>
        <input type="number" placeholder='no of bedrooms' onChange={(e) => setnoBed(e.target.value)} />
      </div>
      <div className="item">
        <label>area</label>
        <input type="number" placeholder='area' onChange={(e) => setarea(e.target.value)} />
      </div>
      <div className="item">
        <label>description</label>
        <textarea type="text" placeholder='description' onChange={(e) => setdesc(e.target.value)} />
      </div>
      <div className="item">
        <label>Furnishing Status</label>
        <select onChange={(e) => setfurnaturing(e.target.value)}>
          <option value="Furnatured" selected >Furnatured</option>
          <option value="Not Furnatured">Not Furnatured</option>
        </select>
      </div>
      <div className="item">
        <label>For :</label>
        <select onChange={(e) => setforWhat(e.target.value)}>
          <option value="Sell" selected >Sell</option>
          <option value="Rent">Rent</option>
        </select>
      </div>
      <div className="item">
        <label>owner number</label>
        <input type="text" placeholder='owner number' onChange={(e) => setownerNo(e.target.value)} />
      </div>
      <div className="item">
        <label class="custum-file-upload" for="file">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
          </div>
          <div class="text">
            <span>Click to upload images</span>
          </div>
          <input
            type="file"
            id="file"
            onChange={(e) => {setenterProductImg(e.target.files);setuploadChange(true)}}
            required
            multiple // Allow multiple file selection
          />        </label>
      </div>
      <button className='btn' style={{border:'1px solid black',fontSize:'25px'}} type="submit" onClick={addProduct}>
        Submit
      </button>
    </form>
  )
}

export default AddProperty