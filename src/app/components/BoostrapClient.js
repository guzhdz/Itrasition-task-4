"use client"

import { useEffect } from 'react';

export default function BoostrapClient() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle"),
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    });
}