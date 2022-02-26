import * as React from "react";

import '../styles/ImageCarousel.css';

let isMounted = false;

interface ICarouselProps {
    imagesToUse?: string[],
    image?: string
    height: number,
    timeBetweenImageChanges?: number
};

interface ICarouselState {
    imagesToUse: string[],
    height: number,
    currentIndex: number,
    timeBetweenImageChanges: number
};

export class ImageCarousel extends React.Component<ICarouselProps, ICarouselState> {
    imgRef: HTMLElement | null;

    constructor(props: ICarouselProps) {
        super(props)

        this.imgRef = null;
        const images = [];
        if (props.image != null) {
            images[0] = props.image;
        } else if (props.imagesToUse != null) {
            for (let i = 0; i < props.imagesToUse.length; i++) {
                images[i] = props.imagesToUse[i];
            }
        }
        this.state = {
            imagesToUse: images,
            currentIndex: 0,
            timeBetweenImageChanges: !!this.props.timeBetweenImageChanges
                ? this.props.timeBetweenImageChanges
                : 10,
            height: this.props.height,
        }
    }

    changePhotoAfterTime = () => {
        const newIndex = (this.state.currentIndex + 1) % this.state.imagesToUse.length;
        setTimeout(() => { 
            if (isMounted === true) {
                this.setState({currentIndex: newIndex});
            }
        }, this.state.timeBetweenImageChanges * 1000);
    }

    setRef = (element: HTMLElement | null) => {
        if (element != null) {
            this.imgRef = element;
        }
    }

    componentDidMount = () => {
        isMounted = true;
    }

    componentWillUnmount = () => {
        isMounted = false;
    }

    render() {
        const imageIndex = this.state.currentIndex % this.state.imagesToUse.length;
        this.changePhotoAfterTime();
        return (
            <div className='carousel'>
                <div
                    ref={element => {this.setRef(element)}}
                    id={`image_${imageIndex}`}
                    className='image'
                    style={{minHeight: `${this.state.height}px`, maxHeight: `${this.state.height}px`}}
                ></div>
            </div>
        )
    }
}
