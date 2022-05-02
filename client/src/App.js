import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap'
import InfoOutput from './InfoOutput';
import axios from 'axios';


function App(props) {

  const [ route, setRoute ] = useState({ dep: "", dest:"" })
  const [ info, setInfo ] = useState({
    departure: "", 
    destination: "", 
    total_time: 0, 
    path_type: 0, 
    detail_path: [] 
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!e.target[0].value){
      console.log("no input in dep")
    } 
    setRoute(prev => {
      return { dep: e.target[0].value, dest: e.target[1].value }
    })
    
  }

  const fetchInfo = async (dep, dest) => {

    let query_str=""
    console.log(dep, dest)

    if(!dep){
      query_str=`dep_x=${props.long}&dep_y=${props.lat}&dest_addr=${dest}`
    } else {
      query_str=`dep_addr=${dep}&dest_addr=${dest}`
    }

    const response = await axios.get(`/info?${query_str}`);

    let data_obj = response.data
        
    setInfo(prev => {
      return { 
        departure: data_obj.info.firstStartStation, 
        destination: data_obj.info.lastEndStation, 
        total_time: data_obj.info.totalTime, 
        path_type: data_obj.path_type, 
        detail_path: data_obj.path 
      }
    })
    
  }

  

  useEffect(()=>{

    /* Side Effect 정의 */
    if(route.dest !== ""){

      fetchInfo(route.dep, route.dest)
    }
    
  },[route]);

  return (
    <div className="App">      
        <header>
          <h1>Public Traffic Route</h1>
        </header>
        <section>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="dep" sm={1} >출발</Label>
              <Col sm={4}>
                <Input name="departure" id="dep" placeholder='현위치'/>
              </Col>
              <Label for="dest" sm={1} >도착</Label>
              <Col sm={4}>
                <Input name="destination" id="dest" required />
              </Col>
              <Col sm={2}>
                <Button>검색</Button>
              </Col>
            </FormGroup>
            
            
          </Form>
          {
           info.departure && <InfoOutput info={info} />
          }
          
        </section>
    </div>
  );
}



export default App;
