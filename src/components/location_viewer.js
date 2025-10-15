// Copyright (c) 2023 Bry Onyoni
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
// SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, CircleMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import pin_icon from '../assets/pin_icon.png'
import pin_icon_dark from '../assets/pin_icon_dark.png'
import pin_icon_grey from '../assets/pin_icon_grey.png'

import my_location_icon from '../assets/my_location_icon.png'

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), { animate: true, })
  })

  return null
}

function FitBounds({ pins, my_location }) {
  const map = useMap();

  React.useEffect(() => {
    if (!map || !pins?.length) return;
    const bounds_positions = pins.map(pin => [pin.lat, pin.lng])
    if(my_location != null){
        bounds_positions.push([my_location.lat, my_location.lon])
    }
    const bounds = L.latLngBounds(bounds_positions);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, pins, my_location]);

  return null;
}

const LocationPicker = forwardRef((props, ref) => {
    const { height, theme, center, pins, size, input_enabled, my_location } = props;
    const mapRef = React.useRef();

    // This function will be callable from outside
    function set_center(new_center) {
        if (mapRef.current) {
            mapRef.current.flyTo([new_center.lat, new_center.lon], 15, { animate: true, });
        }
    }

    function get_center() {
        if (mapRef.current) {
            return mapRef.current.getCenter();
        }
    }

    // Expose specific functions to the parent via the ref
    useImperativeHandle(ref, () => ({
        set_center,
        get_center
    }));

    const pin_object = {
        'light': pin_icon,
        'black': pin_icon_dark,
        'dark': pin_icon,
    }

    const icon_size_obj = { 's':48, 'm':56, 'l':72 };
    const icon_size = icon_size_obj[size];
    const customIcon = L.icon({
        iconUrl: pin_object[theme], // Path to your custom image
        iconSize: [icon_size, icon_size], // Size of the icon [width, height]
        iconAnchor: [icon_size/2, icon_size], // Point of the icon which will correspond to marker's location [x, y]
        popupAnchor: [0, -icon_size] // Point from which the popup should open relative to the iconAnchor
    });


    const icon_size_obj2 = { 's':24, 'm':36, 'l':48 };
    const icon_size2 = icon_size_obj2[size];
    const my_location_marker_icon = L.icon({
        iconUrl: my_location_icon, // Path to your custom image
        iconSize: [icon_size2, icon_size2], // Size of the icon [width, height]
        iconAnchor: [icon_size2/2, icon_size2], // Point of the icon which will correspond to marker's location [x, y]
        popupAnchor: [0, -icon_size2] // Point from which the popup should open relative to the iconAnchor
    });

    const attribution_object = {
        'light': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        'black': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        'dark': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
    const attribution = attribution_object[theme]

    const url_object = {
        'light': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'black': 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        'dark': 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    }
    const url = url_object[theme]

    const bounds = L.latLngBounds(pins.map(pin => [pin['lat'], pin['lng']]));

    const my_location_circle_colors = {
        'light': 'black',
        'black': 'white',
        'dark': 'black',
    }
    const my_location_circle_color = my_location_circle_colors[theme]

    if(pins.length == 0){
        return (
            <div style={{ height: height, width: '100%' }}>
                <MapContainer zoomControl={input_enabled} scrollWheelZoom={false} dragging={input_enabled} touchZoom={input_enabled} doubleClickZoom={input_enabled} boxZoom={input_enabled} keyboard={input_enabled} ref={mapRef} center={[center.lat, center.lon]} zoom={15} style={{ height: '100%', width: '100%', 'margin': '0px', 'border-radius': '11px'}}>
                    <TileLayer attribution={attribution} url={url} />
                </MapContainer>
            </div>
        );
    }

    return (
        <div style={{ height: height, width: '100%'}}>
            <MapContainer zoomControl={input_enabled} scrollWheelZoom={false} dragging={input_enabled} touchZoom={input_enabled} doubleClickZoom={input_enabled} boxZoom={input_enabled} keyboard={input_enabled} ref={mapRef} bounds={bounds} style={{ height: '100%', width: '100%', 'margin': '0px', 'border-radius': '11px' }}>
                <TileLayer attribution={attribution} url={url} />
                {pins.map((pin, index) => (
                    <Marker position={[pin['lat'], pin['lng']]} icon={customIcon}>
                        <Popup>
                            {pin['description']}
                        </Popup>
                    </Marker>
                ))}
                <SetViewOnClick/>
                <FitBounds pins={pins} my_location={my_location} />
                {my_location != null && (
                    <div>
                        <Marker position={[my_location.lat, my_location.lon]} icon={my_location_marker_icon}/>
                        <CircleMarker center={[my_location.lat, my_location.lon]} pathOptions={{ color: my_location_circle_color, weight: 1, opacity: 0.7, fillColor: my_location_circle_color, fillOpacity: 0.5  }} radius={200}>
                            <Popup>🫵</Popup>
                        </CircleMarker>
                    </div>
                )}
            </MapContainer>
        </div>
    );
})

export default LocationPicker;