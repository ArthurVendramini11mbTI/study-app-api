import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Arthur"
    },
    {
      id: 2,
      name: "Alexandre"
    }
  ]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: "Arthur"
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  res.status(201).json({
    id: 3,
    name,
    email
  });
});

export default router;