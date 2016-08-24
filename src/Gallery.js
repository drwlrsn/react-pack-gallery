import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PackItem from 'components/PackItem';
import Pack from 'horizontal-grid-packing';
import Lightbox from 'react-images';

class Gallery extends React.Component {
  static propTypes = {
    media: PropTypes.arrayOf(PropTypes.object.isRequired)
  }

  _generateThumnailImages(media) {
    return media.map((item, idx) => {
      const ar = item.props.width / item.props.height
      var boundClick = this.openLightbox.bind(this, idx);
      return (
        <PackItem clickHandler={boundClick} className="fade-box" key={idx} aspectRatio={ar}>
          {item}
        </PackItem>
      );
    });
  }

  _generateLightboxImages(media) {
    return this.props.media.map((item, idx) => {
      return {
        src: item.props.src,
        srcset: Object.keys(item.props.dataSrcSet).map(
          key => `${item.props.dataSrcSet[key]} ${key}`
        )
      }
    });
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);

    this.state = {
      lightboxIsOpen: false,
      lightboxCurrentImage: 0,
      images: this._generateThumnailImages(this.props.media),
      lightboxImages: this._generateLightboxImages(this.props.media)

    }
  }

  closeLightbox() {
    this.setState({lightboxIsOpen: false});
  }

  openLightbox(idx, event) {
    event.preventDefault();
    this.setState({lightboxIsOpen: true, lightboxCurrentImage: idx});
  }

  handleClickNext() {
    this.setState({lightboxCurrentImage: this.state.lightboxCurrentImage + 1})
  }

  handleClickPrev() {
    this.setState({lightboxCurrentImage: this.state.lightboxCurrentImage - 1})
  }

  handleResize() {
    this.pack.width = this._galleryContainer.clientWidth;
    this.pack.height = Math.round(window.outerHeight / Math.PI);
    this.pack.reload();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.pack = new Pack(this._galleryContainer, {height: 240, padding: 5});
  }

  componentWillUnmount() {
    this.pack.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: this._generateThumnailImages(nextProps.media),
      lightboxImages: this._generateLightboxImages(nextProps.media)
    });
  }

  render() {
    return (
      <div>
        <div {...props} ref={(c) => this._galleryContainer = c}>
          {this.state.images}
        </div>
        <Lightbox
          images={this.state.lightboxImages}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
          currentImage={this.state.lightboxCurrentImage}
          onClickNext={this.handleClickNext}
          onClickPrev={this.handleClickPrev}
        />
      </div>
    );
  }
};

export default Gallery;
