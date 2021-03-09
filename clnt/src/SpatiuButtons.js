import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';
  
class SpatiuButtons extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      
      saveDisabled: true,
      status: '',

    };

    this.updateState = this.updateState.bind(this);
    
    this.updateStatus = this.updateStatus.bind(this);

  }
  
  updateState(disabled) {

    this.setState((state, props) => ({

      saveDisabled: disabled,

    }));

  }

  updateStatus(status) {

    this.setState((state, props) => ({

      status: status,

    }));

  }
 
  render () {

    return (
      
        <div className='-space-add-buttons-container'>
          
          <Tippy
            disabled={this.state.saveDisabled}
            content={
              <div>Salvează</div>
            }
            allowHTML={true}
            placement='top'
            arrow={true}
            theme='material-confort-hints'
            hideOnClick={false}
            offset={[0, 10]}>
            {
              this.state.saveDisabled   ?
                <i className='fas fa-save -space-add-save--disabled'>
                </i>
                                        :
                <i className='fas fa-save -space-add-save'
                  onClick={() => {this.props.save(this.props.operationType)}}>
                </i>
            }
          </Tippy>

          {
            this.state.status === 'loading' &&

            <Spinner className='-space-loading'
              status='loading'
              visibility={true}/>
          }

          {
            this.state.status === 'error' &&
            
            <i className='fas fa-exclamation-circle -space-error'></i>
          }

          <Tippy
            content={
              <div>Renunţă</div>
            }
            allowHTML={true}
            placement='top'
            arrow={true}
            theme='material-confort-disabled'
            hideOnClick={false}
            offset={[0, 10]}>
            <i className='fas fa-window-close -space-add-cancel'
              onClick={this.props.cancel}>
            </i>
          </Tippy>
        </div>
        
    );

  }

}

export default SpatiuButtons;