interface CardTextProps {
  text: string
}

export default function CardText({ text }: CardTextProps) {
  return (
    <p className="font-semibold text-2xl">{text}</p>
  )
}