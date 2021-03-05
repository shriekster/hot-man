import React from 'react';
import Tippy from '@tippyjs/react';

class Bed extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      
      count: '',
      type: '0'

    };

    this.input = this.input.bind(this);

  }

  input(e) {
    
    switch (e.target.dataset.type) {

      case 'count': {

        this.setState({
          count: e.target.value
        }, 
        () => {
          this.props.updateBed (
            this.props.index,
            this.state.count,
            this.state.type)
        });
                
        break;
      }

      case 'type': {

        this.setState({
          type: e.target.value
        }, 
        () => {
          this.props.updateBed (
            this.props.index,
            this.state.count,
            this.state.type)
        });

        break;
      }

    }

  }

  render () {

    return (
      
        <div className='--bed-data'>

            <div style={{width: '29px'}}></div>
            <input className='-space-add-input'
              style={{width: '30%'}}
              data-type='count'
              type='number'
              placeholder='[numărul de paturi]'
              min={1}
              max={100}
              onInput={this.input}
              value={this.state.count}>
            </input>
            
            <div className='--bed-cell'>x</div>

            <div className='-space-add-select-container'
              style={{width: '30%'}}>
            <select className={
              this.state.type === '0' ? '-space-add-select --lightslategray'
                                      : '-space-add-select'}
              value={this.state.type}
              data-type='type'
              onInput={this.input}>
              <option 
                className='--lightslategray'
                value='0'
                key={'bt0'}>
                [tipul de pat]
              </option>
              {this.props.bedTypes.map (type => 
              <option
                className='--darkslategray'
                key={type.Denumire}
                value={type.Denumire}>
                {type.Denumire}
              </option>
              )}
            </select>
            </div>
            <div className='--bed-cell'>
            <Tippy
                content={
                <div>Șterge pat</div>
                }
                allowHTML={true}
                placement='right'
                arrow={true}
                theme='material-confort-disabled'
                hideOnClick={false}
                offset={[0, 10]}>
                <i className='fas fa-trash-alt --remove-bed-icon'
                  onClick={() => this.props.removeBed(this.props.index)}></i>
            </Tippy>
            </div>
        </div>

    );

  }

}

export default Bed;