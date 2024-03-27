interface IProps {
    map: string
}

const Map = (props: IProps) => {
  return (
    <>
    <span className="map-header">MAP</span>
      <div className="map-content" dangerouslySetInnerHTML={{__html: props.map}}>
      </div>
      </>
  )
}
export default Map