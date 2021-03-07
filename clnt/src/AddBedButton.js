import React from 'react';
import Tippy from '@tippyjs/react';
  
class AddBedButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        disabled: true,
    };
 
    this.updateState = this.updateState.bind(this);
  }

  updateState(disabled) {

    this.setState((state, props) => ({

        disabled: disabled,

    }));

  }

  render () {

    return (
    
        <div className='-space-add-beds-title'>
          <Tippy
            disabled={this.state.disabled}
            content={
              <div>Adaugă pat</div>
            }
            allowHTML={true}
            placement='right'
            arrow={true}
            theme='material-confort-hints'
            hideOnClick={false}
            offset={[0, 20]}>
            {
              this.state.disabled   ?
                <div className='--add-beds-icon--disabled'>
                  <i className='fas fa-bed --add-beds-icon-bed'></i>
                  <i className='fas fa-plus --add-beds-icon-plus'></i>
                </div>
                                    :
              <div className='--add-beds-icon'
                onClick={this.props.addBed}>
                <i className='fas fa-bed --add-beds-icon-bed'></i>
                <i className='fas fa-plus --add-beds-icon-plus'></i>
              </div>
            }
          </Tippy>
        </div>
        
    );

  }

}

export default AddBedButton;