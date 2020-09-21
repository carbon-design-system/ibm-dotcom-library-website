import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'carbon-components-react';
import components from '../../data/components.json';

/**
 * Defined available tags for the components
 * @type {{new: *, stable: *, deprecated: *, experimental: *, underConstruction: *, updated: *, notAvailable: *}}
 * @private
 */
const _tags = {
  stable: <Tag type="green">Stable</Tag>,
  experimental: <Tag type="teal">Experimental</Tag>,
  new: <Tag type="purple">New</Tag>,
  updated: <Tag type="blue">Updated</Tag>,
  deprecated: <Tag type="red">Deprecated</Tag>,
  underConstruction: <Tag type="cool-gray">Under construction</Tag>,
  notAvailable: <span className="component-list--unavailable">–</span>,
};

/**
 * Component List component
 */
export class ComponentList extends React.Component {
  static propTypes = {
    /**
     * Component data type [ui|layout]
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'ui',
  };

  /**
   * Renders a single component line item
   * @param {object} currentItem Current component item object
   * @returns {*} Table line item
   */
  renderItems = currentItem => (
    <tr key={currentItem.component}>
      <td>
        <a
          href={currentItem.url}
          target={currentItem.url.indexOf('https://') > -1 ? '_blank' : '_self'}
        >
          {currentItem.component}
        </a>
      </td>
      <td>{currentItem.description}</td>
      <td>
        {Object.keys(currentItem.react)
          .filter(key => currentItem.react[key])
          .map(key => (
            <React.Fragment key={key}>{_tags[key]}</React.Fragment>
          ))}
      </td>
      <td>
        {Object.keys(currentItem.webcomponents)
          .filter(key => currentItem.webcomponents[key])
          .map(key => (
            <React.Fragment key={key}>{_tags[key]}</React.Fragment>
          ))}
      </td>
    </tr>
  );

  render() {
    const { type } = this.props;

    return (
      <div className="bx--row component-list">
        <div className="bx--col-lg-12 bx--no-gutter">
          <table className="page-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Description</th>
                <th>React</th>
                <th>Web Components</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(components[type]).map(component =>
                this.renderItems(components[type][component])
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

/**
 * Returns the table with the list of tabs and their definitions
 * @returns {*} Tag key table
 * @constructor
 */
export const TagKey = () => (
  <div className="bx--row component-list">
    <div className="bx--col-lg-8 component-status__key">
      <h4 className="page-h4">Key</h4>
    </div>
    <div className="bx--col-lg-8 bx--no-gutter">
      <table className="page-table">
        <thead>
        <tr>
          <th>Tag</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{_tags.stable}</td>
          <td>Component is dev and design production-ready.</td>
        </tr>
        <tr>
          <td>{_tags.experimental}</td>
          <td>
            Component can be used but is not considered stable and changes
            to it may occur.
          </td>
        </tr>
        <tr>
          <td>{_tags.deprecated}</td>
          <td>
            Component has either been replaced by a new version or it is
            no longer being supported by the system.
          </td>
        </tr>
        <tr>
          <td>{_tags.notAvailable}</td>
          <td>Component is not available in this framework.</td>
        </tr>
        <tr>
          <td>{_tags.new}</td>
          <td>
            Component is new to framework in the last major version
            update.
          </td>
        </tr>
        <tr>
          <td>{_tags.updated}</td>
          <td>
            An existing component that had been under review, tweaked, and
            re-released in the last major version.
          </td>
        </tr>
        <tr>
          <td>{_tags.underConstruction}</td>
          <td>New components that are currently being worked on.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
);
