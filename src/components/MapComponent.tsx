'use client'

import { useEffect, useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'

const description = 'Lekarz'

interface taskLocation {
  address: string
  center?: GeolocationPosition
}

interface MapComponentProps {
  defaultPositon: { lat: number; lng: number }
  tasksLocations: taskLocation[]
}

export const MapComponent = ({
  defaultPositon,
  tasksLocations,
}: MapComponentProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="aspect-square">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      >
        
        <Btn />
        <Map
          defaultZoom={9}
          defaultCenter={defaultPositon}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          fullscreenControl={false}
        >
          <AdvancedMarker
            position={defaultPositon}
            onClick={() => {
              setOpen(true)
            }}
          >
            <Pin
              background={'grey'}
              borderColor={'grenn'}
              glyphColor={'purple'}
              // można scalić z piorytetami tasków i tak zadania na mapie kolorystycznie wyróżniać
            />
            {/* //you can delete Pin to use default view of marker, or replace Pin with any other custom component */}
          </AdvancedMarker>
          {open && (
            <InfoWindow
              position={defaultPositon}
              onCloseClick={() => {
                setOpen(false)
              }}
            >
              <p>{description}</p>
            </InfoWindow>
          )}
        </Map>
        {tasksLocations.map(
          ({ address }, index) =>
            index !== 0 && (
              <Directions
                key={index}
                origin={address}
                destination={tasksLocations[index - 1].address}
              />
            ),
        )}
      </APIProvider>
    </div>
  )
}

const Directions = ({
  origin,
  destination,
}: {
  origin: string
  destination: string
}) => {
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
  const [routeIndex, setRouteIndex] = useState(0)
  const selected = routes[routeIndex]
  const leg = selected?.legs[0]

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()

  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()

  useEffect(() => {
    if (!routesLibrary || !map) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map])

  useEffect(() => {
    if (!routesLibrary || !map) return

    directionsService
      ?.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      })
      .then((response) => {
        directionsRenderer?.setDirections(response)
        setRoutes(response.routes)
      })
  }, [
    directionsService,
    directionsRenderer,
    map,
    routesLibrary,
    destination,
    origin,
  ])

  if (!leg) return null
  return (
    <div className="directions">
      {' '}
      {/* <h2>{selected?.summary}</h2>
      <p>{`${leg.start_address} to ${leg.end_address} `}</p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p> */}
    </div>
  )
}

const Btn = () => {
  const map = useMap()

  const checkAndMoveToCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {

        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        console.log(position)
        map?.setCenter(pos)
      },
      () => {
        alert('Nie mogę pobrać lokalizacji')
      },
    )
  }
  return (
    <button
      onClick={() => {
        checkAndMoveToCurrentUserLocation()
      }}

    >
      Pan to Current Location
    </button>
  )
}
