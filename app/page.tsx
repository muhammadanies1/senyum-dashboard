import Button from "../components/atoms/Button";

export default function Page() {
	return (
		<>
			{/* <h1>Hello, Next.js!</h1> */}
			<div className="max-w-md mx-auto mt-5 flex flex-row gap-4 items-center">
				<Button variant="primary" size="sm">
					Primary
				</Button>
				<Button variant="primary" size="md">
					Primary
				</Button>
				<Button variant="primary" size="lg">
					Primary
				</Button>
			</div>
			<div className="max-w-md mx-auto mt-5 flex flex-row gap-4 items-center">
				<Button variant="primary-outline" size="sm">
					Primary Outline
				</Button>
				<Button variant="primary-outline" size="md">
					Primary Outline
				</Button>
				<Button variant="primary-outline" size="lg">
					Primary Outline
				</Button>
			</div>
			<div className="max-w-md mx-auto mt-5 flex flex-row gap-4 items-center">
				<Button variant="secondary" size="sm">
					Secondary
				</Button>
				<Button variant="secondary" size="md">
					Secondary
				</Button>
				<Button variant="secondary" size="lg">
					Secondary
				</Button>
			</div>
			<div className="max-w-md mx-auto mt-5 flex flex-row gap-4 items-center">
				<Button variant="secondary-outline" size="sm">
					Second Outline
				</Button>
				<Button variant="secondary-outline" size="md">
					Second Outline
				</Button>
				<Button variant="secondary-outline" size="lg">
					Second Outline
				</Button>
			</div>
		</>
	);
}
