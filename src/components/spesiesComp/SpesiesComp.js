/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import ChooseValueModal from './ChooseValueModal';
import DeleteDialog from '../shared/DeleteDialog';
import Input from '../shared/Input';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as speciesActions from '../../state/actions/speciesActions';


const mapStateToProps = (state) => ({
    ...state.species,
    ...state.trait,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...speciesActions}, dispatch)
    };
}


// COMPONENT

class SpesiesComp extends Component {

    constructor (props) {
        super(props);
        this.state = {
            images: [],
        };
    }


    delete = () => {
        this.props.actions.removeSpecies(this.props.species.speciesId);
        console.log('slett', this.props.species.speciesId);
    }

    renderValues = () => {
        return this.props.species.values.map ((item) => {

            var temp = this.props.traitValueCombo.filter(i =>  i.values.findIndex(l => l.valueId === item) !== -1);
            var value = temp[0].values.find(k => {
                return k.valueId === item;
            });
            // var temp = this.props.species.values.find(i => i.speciesId === item);
            return(
                <div className = "imageFile m-1" key = {item}>
                    <span >{value.valueText}</span>
                </div>
            );
        });
    }

    render () {
        return (
            <div className="spesiesContainer">
                <div className ="row">
                    <div className="col-xl-5 col-lg-12" >
                        <Input
                            name= "latinName"
                            inputType="popup"
                            type ="sp"
                            label = "Latinsk navn"
                            value = {this.props.species.latinName}
                            typeID = {this.props.species.speciesId}
                        />
                        <Input
                            name= "localName"
                            inputType="popup"
                            type ="sp"
                            label = "Lokalt navn"
                            value = {this.props.species.localName}
                            typeID = {this.props.species.speciesId} />
                        <Input
                            name= "order"
                            inputType="popup"
                            type ="sp"
                            label = "Orden"
                            value = {this.props.species.order}
                            typeID = {this.props.species.speciesId} />
                        <Input
                            name= "family"
                            inputType="popup"
                            type ="sp"
                            label = "Familie"
                            value = {this.props.species.family}
                            typeID = {this.props.species.speciesId} />
                        <Input
                            name= "webPage"
                            inputType="popup"
                            type ="sp"
                            label = "Webside"
                            value = {this.props.species.webPage}
                            typeID = {this.props.species.speciesId} />
                    </div>
                    <div className="col-xl-4 col-lg-12">
                        <Input
                            name= "speciesText"
                            inputType="textarea"
                            type ="sp"
                            label = "Beskrivelse"
                            value = {this.props.species.speciesText}
                            typeID = {this.props.species.speciesId} />
                        <Input
                            name= "images"
                            inputType="image"
                            type ="sp"
                            label = "Bilder:"
                            value = {this.props.species.images}
                            typeID = {this.props.species.speciesId} />
                    </div>
                    <div className="col-xl-3 col-lg-12 ">
                        <label className= "input-label" >Verdier:</label>
                        <div className="col-10 row">
                            {this.renderValues()}
                            <button type="button" className="addNewTextBtn" data-toggle="modal" data-target={'#valuedia' +this.props.species.speciesId}>
                                <strong className="input-label">+ Legg til verdi</strong>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="modal fade" id={'valuedia' +this.props.species.speciesId}  tabIndex="-1" role="dialog" aria-labelledby={'valuedia' +this.props.species.speciesId} aria-hidden="true">
                    <ChooseValueModal art= {this.props.species.latinName} spId= {this.props.species.speciesId} hasValue = {this.props.species.values}/>
                </div>
                <div className="modal fade" id={'deleteDialog' +this.props.species.speciesId} tabIndex="-1" role="dialog" aria-labelledby={'deleteDialog' +this.props.species.speciesId} aria-hidden="true">
                    <DeleteDialog  type= "sp" onDialogClick = {this.delete}/>
                </div>
                <button type="button" className= " delIcon setFocus"  data-toggle="modal"  data-target={'#deleteDialog' +this.props.species.speciesId} >
                    <i className="far fa-trash-alt "/>
                </button>
            </div>
        );
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(SpesiesComp);
