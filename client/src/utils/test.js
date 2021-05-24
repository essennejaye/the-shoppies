// // AppHeader.test.js
// import {within, render} from 'react-testing-library';
// import Clock from 'clock';
// const ActualClock = jest.requireActual('clock');
// jest.mock('clock', () =>
//   <div data-testid="clock">
//     <ActualClock />
//   </div>
// );

// test('AppHeader renders a <Clock />', () => {
//   const { getAllByTestId, getByTestId } = render(<AppHeader />);
//   const appHeader = getByTestId('app-header');
//   const clocksInHeader = within(appHeader).getAllByTestId('clock');
//   expect(clocksInHeader.length).toBe(3);
// });