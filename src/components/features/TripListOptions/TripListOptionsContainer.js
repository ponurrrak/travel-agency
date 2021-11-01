import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDurationFrom, changeDurationTo, addTag, removeTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDurationFrom: durationFrom => dispatch(changeDurationFrom(durationFrom)),
  changeDurationTo: durationTo => dispatch(changeDurationTo(durationTo)),
  addTag: tag => dispatch(addTag(tag)),
  removeTag: tag => dispatch(removeTag(tag)),  
});
export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
