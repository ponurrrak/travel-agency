import React from 'react';
import {shallow} from 'enzyme';
import DatePicker from 'react-datepicker';
import OrderOption from './OrderOption';
import {formatPrice} from '../../../utils/formatPrice';

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
  setOrderOption: ()=>{},
  tripCost: '$10.000',
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {currentValue: new Date()},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='dropdown' {...mockProps}/>);
    expect(component).toBeTruthy();
  });
  it('should return null if called without proper "type" prop', () => {
    const component = shallow(<OrderOption type='badType' {...mockProps}/>);
    expect(component.isEmptyRender()).toBeTruthy();
  });
  it('should render "name" prop', () => {
    const component = shallow(<OrderOption type='icons' {...mockProps}/>);
    expect(component.find('.title').text()).toEqual(mockProps.name);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    let component;
    let subcomponent;
    let renderedSubcomponent;

    beforeEach(() => {
      mockProps.setOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });


    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockProps.setOrderOption).toBeCalledTimes(1);
          expect(mockProps.setOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'text': {
        it('contains text type input', () => {          
          const input = renderedSubcomponent.find('input[type="text"]');
          expect(input.length).toBe(1);
          expect(input.prop('value')).toEqual(mockProps.currentValue);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="text"]').simulate('change', {currentTarget: {value: testValue}});
          expect(mockProps.setOrderOption).toBeCalledTimes(1);
          expect(mockProps.setOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'date': {
        it('contains DatePicker component', () => {
          const datePickerComponent = renderedSubcomponent.find(DatePicker);
          expect(datePickerComponent.length).toBe(1);
          expect(datePickerComponent.prop('selected')).toEqual(mockPropsForType.date.currentValue);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', new Date(testValueNumber));
          expect(mockProps.setOrderOption).toBeCalledTimes(1);
          expect(mockProps.setOrderOption).toBeCalledWith({ [mockProps.id]: new Date(testValueNumber) });
        });
        break;
      }
      case 'number': {
        it('contains number type input', () => {
          const input = renderedSubcomponent.find('input[type="number"]');
          expect(input.length).toBe(1);
          expect(input.prop('value')).toEqual(mockPropsForType.number.currentValue);
          expect(input.prop('min')).toEqual(mockProps.limits.min);
          expect(input.prop('max')).toEqual(mockProps.limits.max);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="number"]').simulate('change', {currentTarget: {value: testValueNumber }});
          expect(mockProps.setOrderOption).toBeCalledTimes(1);
          expect(mockProps.setOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'icons': {
        it('contains div elements of "icon" class', () => {
          const iconDivs = renderedSubcomponent.find('div.icon');
          const activeIconDiv = renderedSubcomponent.find('div.icon.iconActive');
          expect(iconDivs.length).toBe(mockProps.required ? mockProps.values.length : mockProps.values.length + 1);
          expect(activeIconDiv.length).toBe(1);
          expect(iconDivs.at(0).children().not('Icon').text()).toEqual('none');
          expect(iconDivs.at(1).children().not('Icon').text()).toEqual(`${mockProps.values[0].name} (${formatPrice(mockProps.values[0].price)})`);
          expect(iconDivs.at(2).children().not('Icon').text()).toEqual(`${mockProps.values[1].name} (${formatPrice(mockProps.values[1].price)})`);
          expect(activeIconDiv.prop('data-icon')).toEqual(mockProps.currentValue);
        });
        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div.icon').at(2).simulate('click');
          expect(mockProps.setOrderOption).toBeCalledTimes(1);
          expect(mockProps.setOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
        it('contains checkbox type inputs', () => {
          const inputs = renderedSubcomponent.find('input[type="checkbox"]');
          expect(inputs.length).toBe(mockProps.values.length);
          inputs.forEach((input, index) => {
            expect(input.prop('value')).toEqual(mockProps.values[index].id);
            expect(input.prop('checked')).toEqual(mockPropsForType.checkboxes.currentValue.indexOf(input.prop('value')) > -1);
          });
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`input[type="checkbox"][value="${testValue}"]`).simulate('change', {currentTarget: {checked: true }});
          expect(mockProps.setOrderOption).toBeCalledTimes(1);
          expect(mockProps.setOrderOption).toBeCalledWith({ [mockProps.id]: [...mockPropsForType.checkboxes.currentValue, testValue] });
        });
        break;
      }
    }
  });
}
