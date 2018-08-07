
import React, {Component} from 'react';
import PropTypes from 'prop-types';


// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as traitActions from '../../state/actions/traitActions';

const mapStateToProps = (state) => ({
    ...state.species,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...traitActions}, dispatch)
    };
}

// COMPONENT

class DeleteDialog extends Component {

    constructor (props) {
        super(props);
        this.state = {

        };
    }
    makeText =() => {
        console.log(this.props.type);
        if (this.props.type === 'sp') {
            return 'Er du sikker på du vil slette denne arten?';
        } else if (this.props.type === 'trait') {
            return 'Er du sikker på du vil slette denne egenskapen?';
        } else if (this.props.type === 'value') {
            return 'Er du sikker på du vil slette denne verdien?';
        } else if (this.props.type === 'bilde') {
            return 'Er du sikker på du vil slette dette bildet?';
        }
    }

    render () {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{this.makeText()}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Lukk</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick= {this.props.onDialogClick}>Slett</button>
                    </div>
                </div>
            </div>
        );
    }
}

DeleteDialog.propTypes = {
    onDialogClick: PropTypes.any,
    type: PropTypes.oneOf(['bilde', 'trait', 'value', 'sp']).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog);
