import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Product=(props)=> {
    const name=props.match.params.id;
    var img=require('./h.mp4');
    const [Data,setData] = useState({});
    const [brought,setbrought]=useState(false);
    useEffect(() => {
        const fetchData = async ()=>{
        try {
         
          const res = await axios.get(`http://127.0.0.1:8000/api/product_detail/${name}`);
         
          setData(res.data);
           
        }
        catch(err){

        }
    }

    fetchData();
  
    },[]);
    function purchase(){
      if(localStorage.getItem('token')){
        let token=localStorage.getItem('token')
        let url = `http://127.0.0.1:8000/api/purchase/${Data.id}/`;
        console.log(token);
        const res = axios.get(url, {
          headers: {
            'Authorization': `token ${token}`
          }
        })
            .then(res => {
              console.log(res);
              setbrought(true);
            })
            .catch(err => console.log(err))
      }
      else alert("Please Login First!");

    }
    console.log(Data);
    return (
      <div>
        <main id="main">
          <section className="intro-single">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="title-single-box">
                    <h1 className="title-single">{Data.name}</h1>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                      <Link to={"/category/"+Data.category}>{Data.category}</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section className="property-single nav-arrow-b">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12">
                  <img src={"http://127.0.0.1:8000"+Data.image} style={{maxWidth:"100%",maxHeight:"100%"}} alt=""/>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                      <div className="property-price d-flex justify-content-center foo">
                        <div className="card-header-c d-flex">
                          <div className="card-box-ico">
                            <span className="ion-money">Rs</span>
                          </div>
                          <div className="card-title-c align-self-center">
                            <h5 className="title-c">{Data.price}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{marginTop:"1rem"}}>
                        <div className="col-sm-12">
                          <div className="title-box-d">
                            <h3 className="title-d">Product Description</h3>
                          </div>
                          <div className="property-description">
                            <p className="description color-text-a">
                              {Data.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{marginTop:"1rem"}}>
                        <div className="col-sm-12">
                          {!brought ?<button className="btn btn-success" onClick={purchase}>Purchase it</button>
                          :<button className="btn btn-danger">Purchased</button>}
                          
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      
        
    );
};
export default Product;
