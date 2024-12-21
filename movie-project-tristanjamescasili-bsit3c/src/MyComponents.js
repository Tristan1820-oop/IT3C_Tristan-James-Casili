
const MyComponent = () => {
    const [state, setState] = useState(false);
    return <div>{state.toString()}</div>;
};


if (true) {
    const [state, setState] = useState(false);
}
