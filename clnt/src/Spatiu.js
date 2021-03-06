import React from 'react';
import Tippy from '@tippyjs/react';
  
class Spatiu extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    let item = this.props.data.items[this.props.index];

    return (
      <div className='-row'
      style={this.props.style}>
        <div className='-row-content'>
          {
            item.isChecked  ?
            <i className='fas fa-check-square -check-icon--checked'
              onClick={() => { 
                this.props.data.toggleChecked(item.index) }}></i>
                            :
            <i className='far fa-square -check-icon'
              onClick={() => { 
                this.props.data.toggleChecked(item.index) }}></i>
          }
          <div data-type='floorNumber' className='-row-cell'>
            {item.etaj}
          </div>
          <div data-type='roomNumber' className='-row-cell'>
            <span
              style={{backgroundColor: item.isSearchResult ? 'yellow' : '#9FD9D9'}}>
              {item.numar}
            </span>
          </div>
          <div data-type='roomType' className='-row-cell'>
            {item.tipSpatiu}
          </div>
          <div data-type='confortType' className='-row-cell'>
            {item.tipConfort}
          </div>
          <Tippy
            interactive={false}
            content=
            {
              <div>
                <div className='-bcell-beds'>Paturi</div>
                <ul>
                {
                  item.paturi.map( pat => 
                    <li 
                      key={`${pat.numar}x${pat.tip}`}
                      className='-bcell-bed'>
                      {pat.numar} x {pat.tip}
                    </li>
                  )
                }
                </ul>
              </div>
            }
            allowHTML={true}
            placement='right'
            arrow={true}
            theme='material-confort-hints'
            hideOnClick={false}
            offset={[0, 40]}>
            <i className='fas fa-info-circle -row-bcell'></i>
          </Tippy>
        </div>
    </div>
    );

  }
 
}

export default Spatiu;