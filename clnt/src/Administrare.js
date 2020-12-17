import React from 'react';
import Tippy from '@tippyjs/react';

import HotelCreator from './HotelCreator';
import HotelUpdater from './HotelUpdater';

class Administrare extends React.Component {
  constructor(props) {
    super(props);

    this.onHotelUpdate = this.onHotelUpdate.bind(this);

    this.state = {
      hotel: '',

      judete: [
        { value: 'AB', label: 'Alba' },
        { value: 'AR', label: 'Arad' },
        { value: 'AG', label: 'Arges' },
        { value: 'BC', label: 'Bacău' },
        { value: 'BH', label: 'Bihor' },
        { value: 'BN', label: 'Bistriţa-Năsăud' },
        { value: 'BT', label: 'Botoşani' },
        { value: 'BV', label: 'Braşov' },
        { value: 'BR', label: 'Brăila' },
        { value: 'B1', label: ' Bucureşti - Sectorul 1' },
        { value: 'B2', label: ' Bucureşti - Sectorul 2' },
        { value: 'B3', label: ' Bucureşti - Sectorul 3' },
        { value: 'B4', label: ' Bucureşti - Sectorul 4' },
        { value: 'B5', label: ' Bucureşti - Sectorul 5' },
        { value: 'B6', label: ' Bucureşti - Sectorul 6' },
        { value: 'BZ', label: 'Buzău' },
        { value: 'CS', label: 'Caraş-Severin' },
        { value: 'CL', label: 'Călăraşi' },
        { value: 'CJ', label: 'Cluj' },
        { value: 'CT', label: 'Constanţa' },
        { value: 'CV', label: 'Covasna' },
        { value: 'DB', label: 'Dâmboviţa' },
        { value: 'DJ', label: 'Dolj' },
        { value: 'GL', label: 'Galaţi' },
        { value: 'GR', label: 'Giurgiu' },
        { value: 'GJ', label: 'Gorj' },
        { value: 'HR', label: 'Harghita' },
        { value: 'HD', label: 'Hunedoara' },
        { value: 'IL', label: 'Ialomiţa' },
        { value: 'IS', label: 'Iaşi' },
        { value: 'IF', label: 'Ilfov' },
        { value: 'MM', label: 'Maramureş' },
        { value: 'MH', label: 'Mehedinţi' },
        { value: 'MS', label: 'Mureş' },
        { value: 'NT', label: 'Neamţ' },
        { value: 'OT', label: 'Olt' },
        { value: 'PH', label: 'Prahova' },
        { value: 'SM', label: 'Satu Mare' },
        { value: 'SJ', label: 'Sălaj' },
        { value: 'SB', label: 'Sibiu' },
        { value: 'SV', label: 'Suceava' },
        { value: 'TR', label: 'Teleorman' },
        { value: 'TM', label: 'Timiş' },
        { value: 'TL', label: 'Tulcea' },
        { value: 'VL', label: 'Vâlcea' },
        { value: 'VS', label: 'Vaslui' },
        { value: 'VN', label: 'Vrancea' },
      ]
    };
  } 

  onHotelUpdate(hotel) {
    if (hotel) {
      this.setState({
        hotel: hotel,
      })
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token
      })
    };

    fetch('http://localhost:3001/main/administrare', requestOptions)
    .then(response => response.json())
    .then(who => {
      this.setState({
        hotel: who.hotel,
      });
    });
  }

  render() {
    return (
      <div>
        <div id='administrare-title'
          className='administrare-title'>
          Administrarea hotelului
        </div>
        <hr className='view--separator'/>
        <div id='view-administrare'
          className='view-administrare'>
          {
            this.state.hotel.nume  ?
            <HotelUpdater
              token={this.props.token}
              judete={this.state.judete}
              hotel={this.state.hotel}
              hotelUpdate={this.onHotelUpdate} /> :
            <HotelCreator
              token={this.props.token}
              judete={this.state.judete}
              hotel={this.state.hotel}
              hotelUpdate={this.onHotelUpdate} />
          }
        </div>
      </div>
    );
  }
}

export default Administrare;
