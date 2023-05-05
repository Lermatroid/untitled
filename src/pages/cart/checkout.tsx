import { type NextPage } from "next";
import { type FunctionComponent, useState } from "react";

import { CreditCard } from "lucide-react";
import { BsPaypal, BsApple } from "react-icons/bs";

import Button from "@/components/shadcn/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/card";
import Input from "@/components/shadcn/Input";
import Label from "@/components/shadcn/Label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/select";

const Checkout: NextPage = () => {
	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-2 font-calsans text-6xl font-black">Checkout</h1>
			<PaymentMethods />
		</main>
	);
};

const PaymentMethods: FunctionComponent = () => {
	return (
		<Card className="border-2 border-b-4 border-black text-black">
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
				<CardDescription>
					Complete your purchase and your books will be on their way!
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
					<Label
						htmlFor="card"
						className="border-muted hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-gray-100 [&:has([data-state=checked])]:border-gray-800 [&:has([data-state=checked])]:bg-black [&:has([data-state=checked])]:text-white"
					>
						<RadioGroupItem value="card" id="card" className="sr-only" />
						<CreditCard className="mb-3 h-6 w-6" />
						Card
					</Label>
					<Label
						htmlFor="paypal"
						className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-gray-100 [&:has([data-state=checked])]:border-gray-800 [&:has([data-state=checked])]:bg-black [&:has([data-state=checked])]:text-white"
					>
						<RadioGroupItem value="paypal" id="paypal" className="sr-only" />
						<BsPaypal className="mb-3 h-6 w-6" />
						Paypal
					</Label>
					<Label
						htmlFor="apple"
						className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-gray-100 [&:has([data-state=checked])]:border-gray-800 [&:has([data-state=checked])]:bg-black [&:has([data-state=checked])]:text-white"
					>
						<RadioGroupItem value="apple" id="apple" className="sr-only" />
						<BsApple className="mb-3 h-6 w-6" />
						Apple
					</Label>
				</RadioGroup>
				<div className="grid gap-2">
					<Label htmlFor="name">Full Name</Label>
					<Input id="name" placeholder="First Last" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="number">Card number</Label>
					<Input id="number" placeholder="" />
				</div>
				<div className="grid grid-cols-3 gap-4">
					<div className="grid gap-2">
						<Label htmlFor="month">Expires</Label>
						<Select>
							<SelectTrigger id="month">
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="1"
								>
									January
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="2"
								>
									February
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="3"
								>
									March
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="4"
								>
									April
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="5"
								>
									May
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="6"
								>
									June
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="7"
								>
									July
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="8"
								>
									August
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="9"
								>
									September
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="10"
								>
									October
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="11"
								>
									November
								</SelectItem>
								<SelectItem
									className="cursor-pointer hover:bg-gray-200"
									value="12"
								>
									December
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="year">Year</Label>
						<Select>
							<SelectTrigger id="year">
								<SelectValue placeholder="Year" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								{Array.from({ length: 10 }, (_, i) => (
									<SelectItem
										key={i}
										value={`${new Date().getFullYear() + i}`}
										className="cursor-pointer hover:bg-gray-200"
									>
										{new Date().getFullYear() + i}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="cvc">CVC</Label>
						<Input id="cvc" placeholder="CVC" />
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					onClick={() =>
						alert("Thanks for ordering! Your items will be on their way soon.")
					}
					className="mx-auto w-full max-w-[400px] bg-black text-white"
				>
					Order Now
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Checkout;
