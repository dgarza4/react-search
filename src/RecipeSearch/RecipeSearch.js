import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import debounce from 'lodash/debounce';
import unescape from 'lodash/unescape';
import { getRecipes } from '../request/recipe';

class RecipeSearch extends Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      recipes: [],
      loading: false
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.getData = debounce(this.retrieveRecipes, 500);
  }

  onFilterChange(evt) {
    this.setState({ filter: evt.target.value }, () => {
      this.getData();
    });
  }

  retrieveRecipes() {
    const { filter } = this.state;

    this.setState({ loading: true });

    getRecipes(filter)
      .then(recipes => {
        this.setState({
          recipes,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          loading: false,
          error: err.message
        });
      });
  }

  render() {
    const { loading, recipes } = this.state;
    return (
      <div className="recipe-search">
        <FormGroup className="recipe-search__filter">
          <InputGroup>
            <FormControl
              onChange={this.onFilterChange}
              placeholder="Search term"
            />
            <InputGroup.Button>
              <Button disabled={loading}>{loading ? 'Loading...' : 'Search'}</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Table striped bordered condensed hover>
          <tbody>
            {recipes.map((item, index) => (
              <tr key={`dataRow_${index}`}>
                <td>
                  <a href={item.href} target="_blank">{unescape(item.title)}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default RecipeSearch;
