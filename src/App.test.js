import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import Home from './pages/home/Home';
import FourZeroFour from './pages/404/FourZeroFour';
configure({ adapter: new Adapter() });
describe('Searchbar', () => {
	let props;
	let searchbar;
	const searchbarRender = () => {
		searchbar = mount(<MemoryRouter initialEntries={["/"]}><App {...props} /></MemoryRouter>);
		return searchbar;
	};

	beforeEach(() => {
		props = {
			autosuggestCount: 15,
			prompt: [ 'apple', 'bear', 'March', 'Mary', 'Mars' ]
		};
	});

	it('always renders a form', () => {
		const form = searchbarRender().find('form');
    expect(form.length).toBeGreaterThan(0);
    searchbarRender().unmount();
	});
	it('always renders an input field', () => {
		const input = searchbarRender().find('input');
    expect(input.length).toBeGreaterThan(0);
    searchbarRender().unmount();
	});
	it('always renders an search button', () => {
		const button = searchbarRender().find('button');
    expect(button.length).toBeGreaterThan(0);
    searchbarRender().unmount();
  });
  it('Does not render an autosuggest by default', () => {
		const button = searchbarRender().find('#downshift-simple-menu');
    expect(button.length).toBeLesserThan(1);
    searchbarRender().unmount();
  });
  it('Does not render an autosuggest by default', () => {
		const button = searchbarRender().find('#downshift-simple-menu');
    expect(button.length).toBeLesserThan(1);
    searchbarRender().unmount();
  });
  test('invalid path should redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(searchbarRender().find(Home)).toHaveLength(0);
    expect(searchbarRender().find(FourZeroFour)).toHaveLength(1);
  });
  
  test('valid path should not redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(searchbarRender().find(Home)).toHaveLength(1);
    expect(searchbarRender().find(FourZeroFour)).toHaveLength(0);
  });
});
