import { ListGroup, ListGroupItem, Table } from 'reactstrap'


function InfoOutput(props) {

    const info = props.info
    console.log(info)


    const BriefInfo = () => {
        
        let output = null
    
        const path_type = ["지하철","버스","버스+지하철"]
        
        output = (
            <tr>
                <th scope="row" >{path_type[info.path_type-1]}</th>
                <th>{info.departure} ~ {info.destination}</th>
                <th>{info.total_time}</th>
            </tr>              
        )
        
        return output
    }


    const pathInfoList = (info.detail_path.length !==0) ? info.detail_path.map((el, index) => {
        
        let traffic_method = ""
        
        if(el.trafficType === 1) traffic_method = el.lane[0].name
        else traffic_method = el.lane[0].busID
        
        
        return (
            
            <ListGroupItem key={index}>
                <p>[{traffic_method}] {el.startName} ~ {el.endName} {el.stationCount}정거장 {el.sectionTime}분 소요</p>
            </ListGroupItem>        
            
        )

    }) : null


    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>종류</th>
                        <th>경로</th>
                        <th>시간(분)</th>
                    </tr>
                </thead>
                <tbody>
                    { BriefInfo() } 
                </tbody>
            </Table>
            <ListGroup>
                { pathInfoList }
            </ListGroup>
        </div>
    )

}



export default InfoOutput