
/* eslint react/prop-types: 0 */
import React, {Component} from 'react';

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

class SpModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            speciesList: props.hasSp
        };
    }

    onClick = () =>{
        this.props.actions.addSpeciesToTrait(this.state.speciesList, this.props.typeID);
    }

    spSel = (name)=> {
        if (this.state.speciesList.includes(name)) {
            var temp = this.state.speciesList;
            temp.splice(temp.indexOf(name),1);
            this.setState({
                speciesList: temp
            });
        }else {
            this.setState({
                speciesList: this.state.speciesList.concat([name])
            });
        }
    }

    renderSp = () => {
        var ret = [];
        ret = this.props.speciesList.map( (item) =>{
            if (item.latinName == '') {
                return (<div key= {item.speciesId}></div>);
            }
            return (
                <div key= {item.speciesId} className="list-group-item" >
                    <div className="form-check form-check-inline">
                        <label className="form-check-label mr-3" htmlFor="spCheck">{item.latinName}</label>
                        <button type="button" className= " checkboxBtn" onClick = {this.spSel.bind(this, item.speciesId)}>
                            {this.state.speciesList.includes(item.speciesId) ?
                                <i className="far fa-check-square"/>
                                :
                                <i className="far fa-square"/>
                            }
                        </button>
                    </div>
                </div>
            );
        });

        return ret;

    }

    render () {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLongTitle">Velg arter som skal gjøre at egenskapen blir synelig.</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.speciesList.length === 1 && this.props.speciesList[0].latinName == '' ?
                            <div>Du har ingen arter og velge.</div>
                            :
                            this.renderSp()
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Lukk</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {this.onClick}>Velg</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpModal);
