[{"content":"import { render, screen } from '@testing-library/react';\n\nfunction ColorList() {\n  return (\n    <ul> \n      <li>Red</li> \n      <li>Blue</li> \n      <li>Green</li>\n    </ul>\n  );\n}\n\nrender(<ColorList/>);","type":"code","id":"cjyz8"},{"content":"test('getBy, queryBy, findBy finding 0 elements', async () => {\n  render(<ColorList />);\n\n  expect(() => screen.getByRole('textbox')).toThrow();\n\n  expect(screen.queryByRole('textbox')).toEqual(null);\n\n  let errorThrown = false;\n  try {\n    await screen.findByRole('textbox');\n  } catch (err) {\n    errorThrown = true;\n  }\n\n  expect(errorThrown).toEqual(true);\n});","type":"code","id":"k7qg6"},{"content":"test('getBy, queryBy, findBy when they find 1 element', async () => {\n  render(<ColorList />);\n\n  expect(screen.getByRole('list')).toBeInTheDocument();\n  expect(screen.queryByRole('list')).toBeInTheDocument();\n  expect(await screen.findByRole('list')).toBeInTheDocument();\n  \n});","type":"code","id":"udojz"},{"content":"test('getBy, queryBy, findBy when finding > 1 elements', async () => {\n  render(<ColorList />);\n\n  expect(() => screen.getByRole('listitem')).toThrow();\n\n  expect(() => screen.queryByRole('listitem')).toThrow();\n\n  let errorThrown = false;\n  try {\n    await screen.findByRole('listitem');\n  } catch (err) {\n    errorThrown = true;\n  }\n\n  expect(errorThrown).toEqual(true);\n});","type":"code","id":"wwdf5"},{"content":"test('getAllBy, queryAllBy, findAllBy', async () => {\n  render(<ColorList />);\n\n  expect(screen.getAllByRole('listitem')).toHaveLength(3);\n  expect(screen.queryAllByRole('listitem')).toHaveLength(3);\n  expect(await screen.findAllByRole('listitem')).toHaveLength(3);\n});","type":"code","id":"3pcxy"},{"content":"test('favor using getBy to prove an element exists', () => {\n  render(<ColorList />);\n\n  const element = screen.getByRole('list');\n\n  expect(element).toBeInTheDocument();\n});","type":"code","id":"rheuh"},{"content":"test('favor queryBy when proving an element does not exist', () => {\n  render(<ColorList />);\n\n  const element = screen.queryByRole('textbox');\n\n  expect(element).not.toBeInTheDocument();\n});","type":"code","id":"6t8fn"},{"content":"import { useState, useEffect } from 'react';\n\nfunction fakeFetchColors() {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(['red', 'green', 'blue']);\n    }, 500);\n  });\n}\n\nfunction LoadableColorList() {\n  const [colors, setColors] = useState([]);\n\n  useEffect(() => {\n    fakeFetchColors().then((data) => setColors(data));\n  }, []);\n\n  const renderedColors = colors.map((color) => {\n    return <li key={color}>{color}</li>;\n  });\n\n  return <ul>{renderedColors}</ul>;\n}\n\nrender(<LoadableColorList />);","type":"code","id":"99upn"},{"content":"test('Favor findBy or findAllBy when data fetching', async () => {\n  render(<LoadableColorList />);\n\n  const els = await screen.findAllByRole('listitem');\n  expect(els).toHaveLength(3);\n});","type":"code","id":"9dw4g"}]