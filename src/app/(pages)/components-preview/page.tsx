"use client";
// src/app/(pages)/components-preview/page.tsx — Temporary preview for UI primitives
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { Badge } from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";
import { Tooltip } from "@/components/ui/Tooltip";
import { Modal } from "@/components/ui/Modal";
import { Loader } from "@/components/ui/Loader";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { useState } from "react";

export default function ComponentsPreviewPage() {
  const [open, setOpen] = useState(false);
  return (
    <main className="container py-16">
      <SectionTitle
        title="Components Preview"
        subtitle="UI primitives and motion presets demonstration."
        gradient
        align="left"
      />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button loading>Loading</Button>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Badge>AI/ML</Badge>
              <Badge variant="outline">Automation</Badge>
              <Badge variant="gradient">Neural Horizon</Badge>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <InputField label="Your Name" placeholder=" " />
              <InputField label="Email" type="email" placeholder=" " error="Please enter a valid email" />
              <InputField label="Subject" placeholder=" " success />
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <CardHeader>
              <CardTitle>Tooltip & Loader</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Tooltip content="Helpful info">
                <Button variant="secondary">Hover me</Button>
              </Tooltip>
              <Loader />
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <Divider label="Modal" className="mt-12" />

      <StaggerChildren>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>Modal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">
                  This modal fades and slides up with accessible focus management.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setOpen(true)}>Open Modal</Button>
              </CardFooter>
            </Card>
          </FadeIn>
        </div>
      </StaggerChildren>

      <Modal open={open} onOpenChange={setOpen} title="Neural Horizon">
        <p className="text-sm text-muted">
          Designing intelligence with empathy — one idea at a time.
        </p>
      </Modal>
    </main>
  );
}


