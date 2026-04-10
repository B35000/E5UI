import React, { Component } from 'react';


class SwipeableViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: props.index || 0, offset: 0, dragging: false };
    this.startX = 0;
    this.startY = 0;
    this.lastX = 0;
    this.lastTime = 0;
    this.velocity = 0;
    this.isHorizontal = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.setState({ index: this.props.index, offset: 0 });
    }
  }

  onPointerDown = (e) => {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.lastX = e.clientX;
    this.lastTime = performance.now();
    this.velocity = 0;
    this.isHorizontal = null;
    this.setState({ dragging: true, offset: 0 });
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  onPointerMove = (e) => {
    if (!this.state.dragging) return;
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    // Lock direction on first significant move
    if (this.isHorizontal === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      this.isHorizontal = Math.abs(dx) > Math.abs(dy);
    }

    if (!this.isHorizontal) return;

    // Track velocity using exponential moving average for smoothness
    const now = performance.now();
    const dt = now - this.lastTime;
    if (dt > 0) {
      const rawVelocity = (e.clientX - this.lastX) / dt; // px/ms
      this.velocity = this.velocity * 0.8 + rawVelocity * 0.2; // smooth it
    }
    this.lastX = e.clientX;
    this.lastTime = now;

    e.stopPropagation();
    this.setState({ offset: dx });
  }

  onPointerUp = (e) => {
    if (!this.state.dragging) return;
    const { index, offset } = this.state;
    const count = React.Children.count(this.props.children);
    const width = this.props.width || window.innerWidth;

    // Use velocity to fling, or fall back to distance threshold
    const velocityThreshold = 0.3; // px/ms
    const distanceThreshold = width * 0.25;

    let newIndex = index;
    if (this.velocity < -velocityThreshold && index < count - 1) {
      newIndex = index + 1; // fast fling left → next
    } else if (this.velocity > velocityThreshold && index > 0) {
      newIndex = index - 1; // fast fling right → prev
    } else if (offset < -distanceThreshold && index < count - 1) {
      newIndex = index + 1; // slow drag past threshold → next
    } else if (offset > distanceThreshold && index > 0) {
      newIndex = index - 1; // slow drag past threshold → prev
    }

    // Calculate spring transition duration based on velocity
    const speed = Math.abs(this.velocity);
    const duration = speed > 0.5
      ? Math.max(150, 300 - speed * 100) // fast fling = shorter duration
      : 350;                              // slow drag = longer, springy feel

    this.setState({ dragging: false, offset: 0, index: newIndex, duration });

    if (newIndex !== index && this.props.onChangeIndex) {
      this.props.onChangeIndex(newIndex);
    }
  }

  render() {
    const { index, offset, dragging, duration = 300 } = this.state;
    const width = this.props.width || window.innerWidth;
    const children = React.Children.toArray(this.props.children);

    // Add rubber-band resistance at edges
    const count = children.length;
    let resistedOffset = offset;
    if ((index === 0 && offset > 0) || (index === count - 1 && offset < 0)) {
      resistedOffset = offset * 0.2; // 20% resistance at edges
    }

    return (
      <div
        style={{ overflow: 'hidden', width }}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onPointerCancel={this.onPointerUp}
      >
        <div style={{
          display: 'flex',
          transform: `translateX(calc(${-index * 100}% + ${resistedOffset}px))`,
          transition: dragging
            ? 'none'
            : `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`, // spring-like easing
          willChange: 'transform',
        }}>
          {children.map((child, i) => (
            <div key={i} style={{ minWidth: '100%', width }}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SwipeableViews;