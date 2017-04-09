/** @babel */
/** @jsx etch.dom */

import etch from 'etch'
import EtchComponent from './../etch-component'

export default class GodocView extends EtchComponent {
  constructor (props) {
    super(props)
    if (props.model) {
      props.model.view = this
    }
    this.props = props
  }

  getTitle () {
    return 'godoc'
  }

  getURI () {
    return 'atom://go-plus-godoc'
  }

  getDefaultLocation () {
    return 'right'
  }

  serialize () {
    return {
      deserializer: 'go-plus-godoc/GodocView'
    }
  }

  render () {
    const doc = this.props.model.doc
    const keymap = this.props.model.keymap

    if (!doc || !doc.decl) {
      return (
        <div>
          <span className='godoc-panel' tabindex='0'>
            {`Place the cursor on a symbol and run the "golang:showdoc" command (bound to ${keymap})...`}
          </span>
        </div>
      )
    }
    let decl
    if (doc.gddo) {
      decl = (
        <a href={doc.gddo}>{doc.decl}</a>
      )
    } else {
      decl = (
        <span>{doc.decl}</span>
      )
    }

    return (
      <div tabindex='0' className='godoc-panel'>
        {doc.import && doc.import.length &&
          <div>
            <span>{`import "${doc.import}"`}</span>
            <br /><br />
          </div>
        }
        {decl}
        <br /><br />
        <span>{doc.doc}</span>
      </div>
    )
  }
}
